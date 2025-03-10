import http from 'k6/http';
import { check } from 'k6';

export let options = {
    vus: 1, // Apenas 1 usuário virtual
    duration: '10s', // Teste rápido
};

export default function () {
    let res = http.get('https://jsonplaceholder.typicode.com/posts');
    check(res, {
        'status é 200': (r) => r.status === 200,
    });
}
