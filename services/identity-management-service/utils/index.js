export const generateDashboardCode = (sectionName, permissions = {}) => {
  if (!sectionName) return "";

  // Convert section name to slug: "Manage Roles" => "manage_roles"
  const baseCode = sectionName.trim().toLowerCase().replace(/\s+/g, "_");

  // Build permissions string
  let permissionCode = "";
  if (permissions.canCreate) permissionCode += "c";
  if (permissions.canRead) permissionCode += "r";
  if (permissions.canUpdate) permissionCode += "u";
  if (permissions.canDelete) permissionCode += "d";

  return permissionCode ? `${baseCode}_${permissionCode}` : baseCode;
};
