class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene")
    }

    preload(){
        this.load.image('rocket', './assets/rocket.png')
        this.load.image('spaceship', './assets/spaceship.png')
        this.load.image('starfield','./assets/starfield.png')
        this.load.image('ShipF','./assets/Ship2.png')
        this.load.spritesheet('explosion', './assets/explosion.png',{
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        })
        this.load.audio('sfx-select', './assets/sfx-select.wav')
        this.load.audio('sfx-explosion', './assets/sfx-explosion.wav')
        this.load.audio('sfx-shot', './assets/sfx-shot.wav')
        this.load.audio('Explosion1','./assets/Explosion1.wav')
        this.load.audio('Explosion2','./assets/Explosion2.wav')
        this.load.audio('Explosion3','./assets/Explosion3.wav')
        this.load.audio('Explosion4','./assets/Explosion4.wav')
    }

    create(){
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {
                start:0, 
                end: 9, 
                first: 0
            }),
            frameRate: 30
        })

        let menuConfig= {
            fontFamily: 'Georgia',
            fontSize: '72px',
            backgroundColor: '#ADD8E6',
            color: '#000',
            align: 'right',
            padding:{
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.add.text(game.config.width/2, game.config.height/4 - borderUISize - borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5)
        menuConfig.fontSize = '16px'
        menuConfig.backgroundColor = '#D3D3D3'
        menuConfig.color = '#000'
        
        this.add.text(game.config.width/2, game.config.height/2, 'Use <--> arrows to move & (F) to fire', menuConfig).setOrigin(0.5)
        menuConfig.backgroundColor = '#D3D3D3'
        menuConfig.color = '#000'
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press <- for Novice or -> for Expert', menuConfig).setOrigin(0.5)

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)){
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000
            }

            this.sound.play('sfx-select')
            this.scene.start('playScene')
        }
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000
            }
            this.sound.play('sfx-select')
            this.scene.start('playScene')
        }
        
    }

}