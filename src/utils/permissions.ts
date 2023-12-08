import { useUserStore } from '@/store/modules/sys/user';

export function hasPermission(permission: string) {
  const { getPermissions } = useUserStore();
  const permissions = getPermissions;
  return permissions.includes(permission);
}
