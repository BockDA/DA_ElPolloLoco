let level1;

/**
 *provide elements for level 1
 */
function initLevel() {
    level1 = new Level(
        [
            new Chicken(),
            new Chicken(),
            new ChickenSmall(),
            new Chicken(),
            new ChickenSmall(),
            new Chicken(),
            new ChickenSmall(),
            new Chicken(),
            new Chicken(),
            new ChickenSmall(),

        ],


        [
            new Cloud(),
            new Cloud(),
            new Cloud()
        ],


        [
            new BackgroundObjekt('img/5_background/layers/air.png', -719),
            new BackgroundObjekt('img/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundObjekt('img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundObjekt('img/5_background/layers/1_first_layer/2.png', -719),

            new BackgroundObjekt('img/5_background/layers/air.png', 0),
            new BackgroundObjekt('img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObjekt('img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObjekt('img/5_background/layers/1_first_layer/1.png', 0),

            new BackgroundObjekt('img/5_background/layers/air.png', 719),
            new BackgroundObjekt('img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObjekt('img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObjekt('img/5_background/layers/1_first_layer/2.png', 719),

            new BackgroundObjekt('img/5_background/layers/air.png', 719 * 2),
            new BackgroundObjekt('img/5_background/layers/3_third_layer/1.png', 719 * 2),
            new BackgroundObjekt('img/5_background/layers/2_second_layer/1.png', 719 * 2),
            new BackgroundObjekt('img/5_background/layers/1_first_layer/1.png', 719 * 2),

            new BackgroundObjekt('img/5_background/layers/air.png', 719 * 3),
            new BackgroundObjekt('img/5_background/layers/3_third_layer/2.png', 719 * 3),
            new BackgroundObjekt('img/5_background/layers/2_second_layer/2.png', 719 * 3),
            new BackgroundObjekt('img/5_background/layers/1_first_layer/2.png', 719 * 3),

            new BackgroundObjekt('img/5_background/layers/air.png', 719 * 4),
            new BackgroundObjekt('img/5_background/layers/3_third_layer/2.png', 719 * 4),
            new BackgroundObjekt('img/5_background/layers/2_second_layer/2.png', 719 * 4),
            new BackgroundObjekt('img/5_background/layers/1_first_layer/2.png', 719 * 4)
        ],

        [
            new Coins(),
            new Coins(),
            new Coins(),
            new Coins(),
            new Coins(),
            new Coins(),

        ],


        [
            new Bootle()
        ],


        [
            new Endboss()
        ],
    );
}
