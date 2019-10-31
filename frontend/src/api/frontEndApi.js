
export async function callBackendAPI() {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
        throw Error(body.message) 
    }
    return body;
}
