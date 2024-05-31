import { loginStore } from '@/store/modules/common/loginStore';
function checkPermission(el: HTMLElement, binding: DirectiveBinding) {
  if (!hasPermission(binding.value)) {
    el.parentNode.removeChild(el);
  }
}
export function hasPermission(permission: string) {
  const { getPermissions } = loginStore();
  const permissions = getPermissions;
  return permissions.includes(permission);
}
export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    checkPermission(el, binding);
  },
};
