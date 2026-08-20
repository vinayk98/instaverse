export function capitalizeFirstLetter(str) {
    if (!str) return ""; // Handle empty strings safely
    return str.charAt(0).toUpperCase() + str.slice(1);
}