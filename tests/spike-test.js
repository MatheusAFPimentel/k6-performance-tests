import http from 'k6/http';
import { check } from 'k6';

export let options = {
    stages: [
        { duration: '10s', target: 200 }, // Sobe rapidamente para 200 usuários
        { duration: '10s', target: 0 }, // Cai para 0 rapidamente
    ],
};

export default function () {
    let res = http.get('https://jsonplaceholder.typicode.com/posts');
    check(res, {
        'status é 200': (r) => r.status === 200,
    });
}
