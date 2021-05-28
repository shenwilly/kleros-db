export const getCourtFullName = (name: string): string => {
    let courtName = name;
    if (courtName.length > 0 && !courtName.toLowerCase().includes("court")) {
        courtName = courtName + " Court";
    }
    
    return courtName;
}
