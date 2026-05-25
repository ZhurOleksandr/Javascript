function createApiClient(baseUrl) {
    let requestCount = 0;

    async function get(path) {
        requestCount++;
        try {
            const response = await fetch(baseUrl + path);
            if (!response.ok) throw new Error('Network error');
            return await response.json();
        } catch (error) {
            console.error(error);
            return { error: "Запит не вдався" };
        }
    }

    function getRequestCount() {
        return requestCount;
    }

    return {
        get,
        getRequestCount
    };
}

// Приклад використання
const api = createApiClient("https://jsonplaceholder.typicode.com");

async function test() {
     const user = await api.get("/users/1");
     const posts = await api.get("/posts");
	 console.log('Task3: user: ', user);
     console.log('Task3: posts: ', posts);
     console.log('Task3: RequestCount: ', api.getRequestCount());
}
test();