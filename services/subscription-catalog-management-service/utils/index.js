export const generateNameByDisplayName = (displayName) => {
  if (!displayName) return "";

  return displayName
    .toLowerCase()
    .replace(/[-\s]/g, "_") // Replace hyphen and whitespace with underscore
    .replace(/[~`!@#$%^&*()+={}\[\];:'"<>.,\/\\\?]/g, ""); // Remove special chars
};
