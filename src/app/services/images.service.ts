import { Injectable } from '@angular/core';
import { url } from 'inspector';

@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  imagesPath: Array<{ id: number; name: string; path: string }> = [
    {
      id: 1,
      name: 'bulbasaur',
      path: 'https://archives.bulbagarden.net/media/upload/f/fb/0001Bulbasaur.png',
    },
    {
      id: 2,
      name: 'ivysaur',
      path: 'https://archives.bulbagarden.net/media/upload/8/81/0002Ivysaur.png',
    },
    {
      id: 3,
      name: 'venusaur',
      path: 'https://archives.bulbagarden.net/media/upload/6/6b/0003Venusaur.png',
    },
    {
      id: 4,
      name: 'charmander',
      path: 'https://archives.bulbagarden.net/media/upload/2/27/0004Charmander.png',
    },
    {
      id: 5,
      name: 'charmeleon',
      path: 'https://archives.bulbagarden.net/media/upload/0/05/0005Charmeleon.png',
    },
    {
      id: 6,
      name: 'charizard',
      path: 'https://archives.bulbagarden.net/media/upload/3/38/0006Charizard.png',
    },
    {
      id: 25,
      name: 'pikachu',
      path: 'https://archives.bulbagarden.net/media/upload/4/4a/0025Pikachu.png',
    },
    {
      id: 26,
      name: 'raichu',
      path: 'https://archives.bulbagarden.net/media/upload/b/b0/0026Raichu.png',
    },
    {
      id: 172,
      name: 'pichu',
      path: 'https://archives.bulbagarden.net/media/upload/b/bb/Spiky-eared_Pichu_DP_1.png',
    },
    {
      id: 10033,
      name: 'venusaur-mega',
      path: 'https://archives.bulbagarden.net/media/upload/f/f7/0003Venusaur-Mega.png',
    },
    {
      id: 10195,
      name: 'venusaur-gmax',
      path: 'https://archives.bulbagarden.net/media/upload/4/45/0003Venusaur-Gigantamax.png',
    },
    {
      id: 10034,
      name: 'charizard-mega-x',
      path: 'https://archives.bulbagarden.net/media/upload/3/35/0006Charizard-Mega_X.png',
    },
    {
      id: 10035,
      name: 'charizard-mega-y',
      path: 'https://archives.bulbagarden.net/media/upload/a/a0/0006Charizard-Mega_Y.png',
    },
    {
      id: 10080,
      name: 'pikachu-rock-star',
      path: 'https://archives.bulbagarden.net/media/upload/0/0a/0025Pikachu-Rock_Star.png',
    },
    {
      id: 10081,
      name: 'pikachu-belle',
      path: 'https://archives.bulbagarden.net/media/upload/f/ff/0025Pikachu-Belle.png',
    },
    {
      id: 10082,
      name: 'pikachu-pop-star',
      path: 'https://archives.bulbagarden.net/media/upload/0/09/0025Pikachu-Pop_Star.png',
    },
    {
      id: 10083,
      name: 'pikachu-phd',
      path: 'https://archives.bulbagarden.net/media/upload/c/c1/0025Pikachu-PhD.png',
    },
    {
      id: 10084,
      name: 'pikachu-libre',
      path: 'https://archives.bulbagarden.net/media/upload/0/03/0025Pikachu-Libre.png',
    },
    {
      id: 10085,
      name: 'pikachu-cosplay',
      path: 'https://archives.bulbagarden.net/media/upload/b/b4/0025Pikachu-Cosplay.png',
    },
    {
      id: 10094,
      name: 'pikachu-original-cap',
      path: 'https://archives.bulbagarden.net/media/upload/5/5b/0025Pikachu-Original_Cap.png',
    },
    {
      id: 10095,
      name: 'pikachu-hoenn-cap',
      path: 'https://archives.bulbagarden.net/media/upload/b/b6/0025Pikachu-Hoenn_Cap.png',
    },
    {
      id: 10096,
      name: 'pikachu-sinnoh-cap',
      path: 'https://archives.bulbagarden.net/media/upload/f/fe/0025Pikachu-Sinnoh_Cap.png',
    },
    {
      id: 10097,
      name: 'pikachu-unova-cap',
      path: 'https://archives.bulbagarden.net/media/upload/3/38/0025Pikachu-Unova_Cap.png',
    },
    {
      id: 10098,
      name: 'pikachu-kalos-cap',
      path: 'https://archives.bulbagarden.net/media/upload/7/75/0025Pikachu-Kalos_Cap.png',
    },
    {
      id: 10099,
      name: 'pikachu-alola-cap',
      path: 'https://archives.bulbagarden.net/media/upload/1/13/0025Pikachu-Alola_Cap.png',
    },
    {
      id: 10148,
      name: 'pikachu-partner-cap',
      path: 'https://archives.bulbagarden.net/media/upload/c/c0/0025Pikachu-Partner_Cap.png',
    },
    {
      id: 10158,
      name: 'pikachu-starter',
      path: 'https://archives.bulbagarden.net/media/upload/4/4a/0025Pikachu.png',
    },
    {
      id: 10160,
      name: 'pikachu-world-cap',
      path: 'https://archives.bulbagarden.net/media/upload/2/28/0025Pikachu-World_Cap.png',
    },
    {
      id: 10199,
      name: 'pikachu-gmax',
      path: 'https://archives.bulbagarden.net/media/upload/d/da/0025Pikachu-Gigantamax_2.png',
    },

    {
      id: 10196,
      name: 'charizard-gmax',
      path: 'https://archives.bulbagarden.net/media/upload/0/0c/0006Charizard-Gigantamax.png',
    },
  ];

  getImagePath(id: number | undefined): string {
    const image = this.imagesPath.find((image) => image.id === id);
    return image ? image.path : '';
  }
  getImagebyName(name: string | undefined): string {
    const image = this.imagesPath.find((image) => image.name === name);
    return image ? image.path : '';
  }
}
