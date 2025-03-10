import http from 'k6/http';
import { check } from 'k6';

export let options = {
    vus: 50, // 50 usuários simultâneos
    duration: '1m', // Teste de 1 minuto
};

export default function () {
    let res = http.get('https://jsonplaceholder.typicode.com/posts');
    check(res, {
        'status é 200': (r) => r.status === 200,
    });
}
