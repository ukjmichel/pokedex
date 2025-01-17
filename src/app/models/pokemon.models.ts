// Base and Reusable Interfaces
export interface NamedAPIResource {
  name: string;
  url: string;
}

// Core Pokémon Data
export interface Pokemon {
  abilities: PokemonAbility[];
  base_experience: number;
  cries: PokemonCries;
  forms: PokemonForms;
  game_indices: PokemonGameIndices;
  height: number;
  held_items: PokemonHeldItems;
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: PokemonMoves;
  name: string;
  order: number;
  past_types: PokemonPastTypes;
  species: PokemonSpecies;
  sprites: PokemonSprites;
  stats: PokemonStat[];
  types: PokemonTypeSlot[];
  weight: number;
}

// Abilities
export interface Ability {
  name: string;
  url: string;
}

export interface PokemonAbility {
  ability: Ability;
  is_hidden: boolean;
  slot: number;
}

export interface PokemonAbilities {
  abilities: PokemonAbility[];
}

// Cries
export interface PokemonCries {
  latest: string;
  legacy: string;
}

// Forms
export interface PokemonForm {
  name: string;
  url: string;
}

export interface PokemonForms {
  forms: PokemonForm[];
}

// Game Indices
export interface GameVersion {
  name: string;
  url: string;
}

export interface GameIndex {
  game_index: number;
  version: GameVersion;
}

export interface PokemonGameIndices {
  game_indices: GameIndex[];
}

// Held Items
export interface Item {
  name: string;
  url: string;
}

export interface VersionDetail {
  rarity: number;
  version: GameVersion;
}

export interface HeldItem {
  item: Item;
  version_details: VersionDetail[];
}

export interface PokemonHeldItems {
  held_items: HeldItem[];
}

// Moves
export interface Move {
  name: string;
  url: string;
}

export interface MoveLearnMethod {
  name: string;
  url: string;
}

export interface VersionGroup {
  name: string;
  url: string;
}

export interface VersionGroupDetail {
  level_learned_at: number;
  move_learn_method: MoveLearnMethod;
  version_group: VersionGroup;
}

export interface PokemonMove {
  move: Move;
  version_group_details: VersionGroupDetail[];
}

export interface PokemonMoves {
  moves: PokemonMove[];
}

// Types
export type PokemonTypeName =
  | 'normal'
  | 'fighting'
  | 'flying'
  | 'poison'
  | 'ground'
  | 'rock'
  | 'bug'
  | 'ghost'
  | 'steel'
  | 'stellar'
  | 'fire'
  | 'water'
  | 'grass'
  | 'electric'
  | 'psychic'
  | 'ice'
  | 'dragon'
  | 'dark'
  | 'fairy'
  | '???';

export interface PokemonType {
  name: PokemonTypeName;
  url: string;
}

export interface PokemonTypeSlot {
  slot: number;
  type: PokemonType;
}

export interface PokemonPastType {
  generation: VersionGroup;
  types: PokemonTypeSlot[];
}

export interface PokemonPastTypes {
  past_types: PokemonPastType[];
}

// Species
export interface PokemonSpecies {
  name: string;
  url: string;
}

// Sprites
export interface PokemonSprites {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
  other?: {
    dream_world: {
      front_default: string | null;
      front_female: string | null;
    };
    home: {
      front_default: string | null;
      front_female: string | null;
      front_shiny: string | null;
      front_shiny_female: string | null;
    };
    'official-artwork': {
      front_default: string | null;
      front_shiny: string | null;
    };
  };
  versions?: {
    [generation: string]: {
      [version: string]: {
        back_default: string | null;
        back_female: string | null;
        back_shiny: string | null;
        back_shiny_female: string | null;
        front_default: string | null;
        front_female: string | null;
        front_shiny: string | null;
        front_shiny_female: string | null;
      };
    };
  };
}

// Stats
export interface Stat {
  name: string;
  url: string;
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: Stat;
}

// Pokémon Species Details
export interface PokemonSpeciesDetails {
  base_happiness: number;
  capture_rate: number;
  color: NamedAPIResource;
  egg_groups: NamedAPIResource[];
  evolution_chain: { url: string };
  evolves_from_species: NamedAPIResource | null;
  flavor_text_entries: FlavorTextEntry[];
  form_descriptions: any[];
  forms_switchable: boolean;
  gender_rate: number;
  genera: Genus[];
  generation: NamedAPIResource;
  growth_rate: NamedAPIResource;
  habitat: NamedAPIResource | null;
  has_gender_differences: boolean;
  hatch_counter: number;
  id: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  name: string;
  names: Name[];
  order: number;
  pal_park_encounters: PalParkEncounter[];
  pokedex_numbers: PokedexNumber[];
  shape: NamedAPIResource;
  varieties: Variety[];
}

export interface FlavorTextEntry {
  flavor_text: string;
  language: NamedAPIResource;
  version: NamedAPIResource;
}

export interface Genus {
  genus: string;
  language: NamedAPIResource;
}

export interface Name {
  name: string;
  language: NamedAPIResource;
}

export interface PalParkEncounter {
  area: NamedAPIResource;
  base_score: number;
  rate: number;
}

export interface PokedexNumber {
  entry_number: number;
  pokedex: NamedAPIResource;
}

export interface Variety {
  is_default: boolean;
  pokemon: NamedAPIResource;
}

//Evolution Detail

export interface EvolutionDetails {
  gender: number | null;
  held_item: string | null;
  item: string | null;
  known_move: string | null;
  known_move_type: string | null;
  location: string | null;
  min_affection: number | null;
  min_beauty: number | null;
  min_happiness: number | null;
  min_level: number | null;
  needs_overworld_rain: boolean;
  party_species: string | null;
  party_type: string | null;
  relative_physical_stats: number | null;
  time_of_day: string;
  trade_species: string | null;
  trigger: {
    name: string;
    url: string;
  };
  turn_upside_down: boolean;
}

export interface EvolutionChain {
  baby_trigger_item: string | null;
  chain: EvolutionNode;
  id: number;
}

export interface EvolutionNode {
  evolution_details: EvolutionDetails[];
  evolves_to: EvolutionNode[];
  is_baby: boolean;
  species: {
    name: string;
    url: string;
  };
}

//

export interface PokemonListResponse {
  count: number; // Total number of Pokémon available
  next: string | null; // URL for the next page of results (null if none)
  previous: string | null; // URL for the previous page of results (null if none)
  results: PokemonResult[]; // Array of Pokémon results
}

export interface PokemonResult {
  name: string; // Name of the Pokémon
  url: string; // URL to get details of the Pokémon
}
