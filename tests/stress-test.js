import http from 'k6/http';
import { check } from 'k6';

export let options = {
    stages: [
        { duration: '1m', target: 100 }, // Aumenta para 100 usuários
        { duration: '2m', target: 200 }, // Aumenta para 200 usuários
        { duration: '1m', target: 0 }, // Reduz gradualmente
    ],
};

export default function () {
    let res = http.get('https://jsonplaceholder.typicode.com/posts');
    check(res, {
        'status é 200': (r) => r.status === 200,
    });
}
