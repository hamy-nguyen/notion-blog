import rpc from './rpc'

interface NotionUserResponse {
  results: Array<{
    value: {
      id: string;
      given_name?: string;
      family_name?: string;
    };
  }>;
}

interface NotionUserValue {
  id: string;
  given_name?: string;
  family_name?: string;
}

export default async function getNotionUsers(ids: string[]) {
  const { results = [] } = await rpc('getRecordValues', {
    requests: ids.map((id: string) => ({
      id,
      table: 'notion_user',
    })),
  }) as NotionUserResponse

  const users: Record<string, { full_name: string }> = {}

  for (const result of results) {
    const { value } = result || { value: {} as NotionUserValue }
    const { given_name, family_name } = value
    let full_name = given_name || ''

    if (family_name) {
      full_name = `${full_name} ${family_name}`
    }
    users[value.id] = { full_name }
  }

  return { users }
}
