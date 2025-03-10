import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 20,
    duration: '5m',
};

export default function () {
    let urls = [
        'https://jsonplaceholder.typicode.com/posts',
        'https://jsonplaceholder.typicode.com/comments',
        'https://jsonplaceholder.typicode.com/users',
    ];

    urls.forEach(url => {
        let res = http.get(url);
        check(res, {
            'status é 200': (r) => r.status === 200,
        });
        sleep(1);
    });
}
