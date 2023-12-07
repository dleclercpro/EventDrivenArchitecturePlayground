import { POKEMON_API } from '@/config';
import { capitalizeFirstCharacter } from '../../../Common/src/utils/string';

export const getPokemonList = async (limit: number) => {
    const res = await fetch(`${POKEMON_API}/pokemon/?limit=${limit}`);
    const { results } = await res.json();

    return results.map(({ name }: { name: string }) => capitalizeFirstCharacter(name));
}