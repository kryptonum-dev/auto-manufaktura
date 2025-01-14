import { useCallback, useState } from 'react';
import { useClient, defineField, defineType, type SlugRule } from 'sanity';
import { Box, Text, Tooltip, Button, Stack, useToast, Card, Dialog } from '@sanity/ui';

type RedirectTypes = {
  _key: string;
  source: { current: string };
  destination: { current: string };
  isPermanent: boolean;
};

const SlugValidation = (Rule: SlugRule) =>
  Rule.custom(value => {
    if (!value || !value.current) return 'Wartość nie może być pusta';
    if (!value.current.startsWith('/')) return 'Ścieżka musi być ścieżką względną (zaczynać się od /)';
    return true;
  });

const ProcessJsonButton = (props: { value: any; renderDefault: any }) => {
  const { value, renderDefault } = props;
  const client = useClient({ apiVersion: '2025-01-05' });
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const processJson = useCallback(async () => {
    if (!value) return;
    setIsLoading(true);
    try {
      const parsed = JSON.parse(value) as RedirectTypes[];
      const processedRedirects = parsed.map(redirect => ({
        _key: crypto.randomUUID(),
        source: { current: redirect.source },
        destination: { current: redirect.destination },
        isPermanent: redirect.isPermanent ?? true,
      }));
      await client.patch('drafts.redirects').set({ redirects: processedRedirects }).commit();
      toast.push({
        status: 'success',
        title: 'Sukces',
        description: `${processedRedirects.length} przekierowań zostało przetworzonych i zaktualizowanych.`,
      });
    } catch {
      toast.push({
        status: 'error',
        title: 'Błąd',
        description: 'Nie udało się przetworzyć danych JSON. Sprawdź poprawność składni.',
      });
    } finally {
      setIsLoading(false);
      setShowConfirmDialog(false);
    }
  }, [value, client, toast]);

  return (
    <Stack space={3}>
      {renderDefault(props)}
      <Button
        tone='caution'
        onClick={() => setShowConfirmDialog(true)}
        disabled={!value || isLoading}
        loading={isLoading}
        style={{ textAlign: 'center' }}
      >
        Przetwórz JSON i zaktualizuj przekierowania
      </Button>
      {showConfirmDialog && (
        <Dialog
          header='Potwierdź aktualizację'
          id='confirm-dialog'
          onClose={() => setShowConfirmDialog(false)}
          zOffset={1000}
        >
          <Box padding={4}>
            <Stack space={5}>
              <Text>
                Czy na pewno chcesz przetworzyć ten JSON? Wszystkie istniejące przekierowania zostaną nadpisane.
              </Text>
              <Stack space={3}>
                <Button
                  tone='caution'
                  onClick={processJson}
                  loading={isLoading}
                  style={{ textAlign: 'center' }}
                >
                  Tak, przetwórz i zaktualizuj
                </Button>
                <Button
                  mode='ghost'
                  onClick={() => setShowConfirmDialog(false)}
                  disabled={isLoading}
                  style={{ textAlign: 'center' }}
                >
                  Anuluj
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Dialog>
      )}
    </Stack>
  );
};

export default defineType({
  name: 'redirects',
  type: 'document',
  title: 'Przekierowania',
  icon: () => '🔀',
  fields: [
    defineField({
      name: 'redirects',
      type: 'array',
      title: 'Lista przekierowań',
      description: 'Lista przekierowań, które przenoszą użytkowników na inne strony. Ważne dla SEO.',
      of: [
        defineField({
          name: 'redirect',
          type: 'object',
          fields: [
            defineField({
              name: 'source',
              type: 'slug',
              title: 'Ścieżka źródłowa',
              description: 'Ścieżka URL, z której ma nastąpić przekierowanie.',
              validation: Rule => [
                SlugValidation(Rule),
                Rule.custom((value, context) => {
                  const redirects = (context.document?.redirects || []) as RedirectTypes[];
                  const currentRedirect = context.parent as RedirectTypes;
                  const isDuplicate = redirects.some(
                    redirect => redirect._key !== currentRedirect._key && redirect.source?.current === value?.current
                  );
                  if (isDuplicate) return 'Ta ścieżka jest już używana w innym przekierowaniu.';
                  return true;
                }),
              ],
            }),
            defineField({
              name: 'destination',
              type: 'slug',
              title: 'Ścieżka docelowa',
              description: 'Ścieżka URL, na którą użytkownik zostanie przekierowany.',
              validation: SlugValidation,
            }),
            defineField({
              name: 'isPermanent',
              type: 'boolean',
              title: 'Stałe przekierowanie',
              description: 'Określa, czy przekierowanie jest stałe (301) czy tymczasowe (302).',
              initialValue: true,
            }),
          ],
          preview: {
            select: {
              source: 'source.current',
              destination: 'destination.current',
              isPermanent: 'isPermanent',
            },
            prepare({ source, destination, isPermanent }) {
              return {
                title: `Źródło: ${source}`,
                subtitle: `Cel: ${destination}`,
                media: () => (
                  <Tooltip
                    content={
                      <Box padding={1}>
                        <Text size={1}>{isPermanent ? '🔒 Stałe' : '🔄 Tymczasowe'}</Text>
                      </Box>
                    }
                    placement='top'
                    portal
                  >
                    <span>{isPermanent ? '🔒' : '🔄'}</span>
                  </Tooltip>
                ),
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'jsonEditor',
      type: 'text',
      title: 'Edytor JSON',
      description: (
        <>
          Wklej tablicę JSON z obiektami przekierowań. Wymagane właściwości:
          <ul>
            <li>`source` - ścieżka źródłowa musi zaczynać się od "/" (np. "/old")</li>
            <li>`destination` - ścieżka docelowa musi zaczynać się od "/" (np. "/new")</li>
            <li>`isPermanent`- jest opcjonalnym polem typu boolean (domyślnie true - stałe przekierowanie 301)</li>
          </ul>
        </>
      ),
      components: {
        input: props => (
          <Stack space={3}>
            <Card
              tone='caution'
              padding={4}
              border
              radius={2}
            >
              <Stack space={3}>
                <Text weight='semibold'>⚠️ Ostrzeżenie: Używaj ostrożnie!</Text>
                <Text size={1}>
                  Ten edytor nadpisuje wszystkie istniejące przekierowania. Wymagana znajomość formatu JSON.
                </Text>
              </Stack>
            </Card>
            <ProcessJsonButton {...props} />
          </Stack>
        ),
      },
      validation: Rule =>
        Rule.custom(value => {
          if (!value) return true;
          try {
            const parsed = JSON.parse(value);
            if (!Array.isArray(parsed)) return 'JSON musi być tablicą obiektów przekierowań.';
            for (const redirect of parsed) {
              if (!redirect.source?.startsWith('/') || !redirect.destination?.startsWith('/')) {
                return 'Ścieżki źródłowe i docelowe muszą zaczynać się od "/"';
              }
            }
            return true;
          } catch {
            return 'Nieprawidłowy format JSON.';
          }
        }),
    }),
  ],
  preview: {
    prepare: () => ({
      title: 'Przekierowania',
    }),
  },
});
