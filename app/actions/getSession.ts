const getSession = () => {
    if (global?.window !== undefined){
        const sessionString = localStorage.getItem('session');
        if (sessionString !== null) {
            return JSON.parse(sessionString);
        }
    }
    return {}; 
}

export default getSession;

