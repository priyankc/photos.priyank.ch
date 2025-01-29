import { albums } from './actions'

export default async function Album() {
    const x = await albums('test');
    return (
        <div>
            Cat
            <p>{x.albumName}</p>
            <p>{x.id}</p>
        </div>
    );
}