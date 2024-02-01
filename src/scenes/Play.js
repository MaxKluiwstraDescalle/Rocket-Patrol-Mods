class Play extends Phaser.Scene {
    constructor(){
        super("playScene")
    }

    

    create(){
        this.starfield = this.add.tileSprite( 0, 0, 640, 480, 'starfield').setOrigin(0,0)

        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize*2,0x00FF00).setOrigin(0,0)
        this.add.rectangle(0, 0, game.config.width, borderUISize,0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0)

        this.p1Rocket= new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0)

        keyFIRE=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        keyRESET=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyLEFT= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

        
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize * 5 + borderPadding * 2, 'spaceship', 0 , 10).setOrigin(0, 0)
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0 , 10).setOrigin(0, 0)
        this.ship04 = new Spaceship(this,game.config.width+ borderUISize *3, borderUISize*8+ borderPadding * 2, 'spaceship', 0, 5).setOrigin(0,0)
        this.ship01 = new SpaceshipF(this, game.config.width + borderUISize * 6, borderUISize * 4, 'ShipF', 0, 30). setOrigin(0, 0)

        this.p1Score = 0

        let scoreConfig= {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding:{
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft= this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig)

        this.gameOver = false

        scoreConfig.fixedWidth = 0
        this.clock = this.time.delayedCall(game.settings.gameTimer,()=>{
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5)
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5)
            this.gameOver = true
        }, null, this)


        
        if(this.gameTimer== 60000){
            timer = this.time.addEvent({
                delay: 1000,
                callback: this.updateTime,
                callbackScope: this,
                repeat: 119
            });
            timeText = this.add.text(game.config.width/2, borderUISize+ borderPadding *2, 'Time: 60', {fontSize: '32px', fill: '#000'})
         }else{
            timer = this.time.addEvent({
                delay: 1000,
                callback: this.updateTime,
                callbackScope: this,
                repeat: 89
            });
            timeText = this.add.text(game.config.width/2, borderUISize+ borderPadding *2, 'Time: 45', {fontSize: '32px', fill: '#000'})
         }
        
    }



    update(){
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)){
            this.scene.restart()
        }

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)){
            this.scene.start("menuScene")
        }
        this.starfield.tilePositionX -= 4


        this.p1Rocket.update()

        this.ship01.update()
        this.ship02.update()
        this.ship03.update()

        if(this.checkCollision(this.p1Rocket, this.ship03)){
            this.p1Rocket.reset()
            this.shipExplode(this.ship03)
        }

        if(this.checkCollision(this.p1Rocket, this.ship02)){
            this.p1Rocket.reset()
            this.shipExplode(this.ship02)
        }

        if(this.checkCollision(this.p1Rocket, this.ship03)){
            this.p1Rocket.reset()
            this.shipExplode(this.ship01)
        }

        if(this.checkCollision(this.p1Rocket, this.ship04)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship04)
        }

        if(!this.gameOver){
            this.p1Rocket.update()
            this.ship01.update()
            this.ship02.update()
            this.ship03.update()
            this.ship04.update()
        }


    }

    checkCollision(rocket, ship){
        if(rocket.x < ship.x + ship.width && rocket.x + rocket.width > ship.x && rocket.y < ship.y + ship.height && rocket.height + rocket.y > ship.y){
            return true
        }else{
            return false
        }
    }

    shipExplode(ship){
        ship.alpha = 0

        const emiter = this.add.particles(0,0,'explosion',{
            x: ship.x + ship.width/2,
            y: ship.y + ship.height/2,
            speed: {min:-100, max: 100},
            angle: {min: 0, max:360},
            scale: {start: 1, end: 0},
            lifespan: 1000,
            blendmode: 'ADD',
            quantity: 20
        })

        /*let emCon = {
            x: ship.x + ship.width/2,
            y: ship.y + ship.height/2,
            speed: {min:-100, max: 100},
            angle: {min: 0, max:360},
            scale: {start: 1, end: 0},
            lifespan: 100,
            blendmode: 'ADD'

        };*/

        //particles.createEmitter(emCon);

        //let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0,0);
        //boom.anims.play('explode')
        /*boom.on('animationcomplete',()=> {
            ship.reset()
            ship.alpha = 1;
            boom.destroy()
        })*/

        this.time.delayedCall(1000, ()=>{
            ship.reset()
            ship.alpha = 1;
            emiter.destroy()
        });
        this.p1Score += ship.points
        this.scoreLeft.text = this.p1Score

        var randNum = Math.floor(Math.random()*4)+1
        //console.log(randNum)
        if(randNum == 1){
            //console.log('1')
            this.sound.play('Explosion1')
        }else if(randNum == 2){
            //console.log('2')
            this.sound.play('Explosion2')
        }else if(randNum == 3){
            //console.log('3')
            this.sound.play('Explosion3')
        }else{
            //console.log('4')
            this.sound.play('Explosion4')
        }

        //this.sound.play('sfx-explosion')
    }

    updateTime() {
        timer.repeatCount--; // Decrease the repeat count
        timeText.setText('Time: ' + timer.repeatCount/2); // Update the time text
    }



}