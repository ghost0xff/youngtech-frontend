
export function getInitials(fullname: string): string {
    if(fullname.length <= 0) return ":'v"; 
    const names = fullname.split(' ');
    const firsts: string[] = [];
    for (let index = 0; index < names.length; index++) {
        const name = names[index];
        firsts.push(name[0].toUpperCase());
    }
    const uppers = firsts.toString().replaceAll(',','');
    let initials: string;
    if(uppers.length > 2) {
        initials = uppers.slice(0,2);
    } else {
        initials = uppers;
    }
    return initials;
}

export function withFirstUpperCase(someString: string) {
    if(someString.length <= 0) {
        return someString;
    }
    const firstButUpper = someString.charAt(0).toUpperCase();
    return someString.replace(someString.charAt(0), firstButUpper);
}

