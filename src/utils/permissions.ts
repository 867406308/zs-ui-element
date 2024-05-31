import { useUserStore } from '@/store/modules/common/loginStore';

export function hasPermission(permission: string) {
  const { getPermissions } = useUserStore();
  const permissions = getPermissions;
  return permissions.includes(permission);
}
