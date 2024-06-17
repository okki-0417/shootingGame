//自機関連



//自機のクラス
class Jiki
{
	constructor()
	{
		this.x = (FIELD_W/2)<<8;
		this.y = (FIELD_H -50)<<8;(FIELD_H/2)<<8;
		
		this.mhp    = 100;
		this.hp     = this.mhp;
		
		this.hp     = 100;
		this.speed  = 1024;
		this.anime  = 0;
		this.reload = 0;
		this.relo2  = 0;
		this.r      = 3;
		this.damage = 0;
		this.muteki = 0;
		this.count  = 0;
	}
	
	//自機の移動
	update()
	{
		this.count++;
		
		if( this.damage )this.damage--;
		if( this.muteki )this.muteki--;
		
		if( key[32] && this.reload==0 )
		{
			tama.push( new Tama(this.x+(4<<8),this.y-(10<<8), 50, -2000 ) );
			tama.push( new Tama(this.x-(4<<8),this.y-(10<<8),-50, -2000 ) );
			tama.push( new Tama(this.x+(8<<8),this.y-(5<<8), 200, -2000 ) );
			tama.push( new Tama(this.x-(8<<8),this.y-(5<<8),-200, -2000 ) );
			
			//tama.push( new Tama(this.x+(0<<8),this.y-(10<<8), 0, -1300 ) );
			
			this.reload=4;
			
			if(++this.relo2 ==4)
			{
				this.reload =20;
				this.relo2  = 0;
			}
		}
		
		if( !key[32] ) this.reload = this.relo2 = 0; 
		
		if( this.reload>0 ) this.reload--;
		
		if( key[37] && this.x>this.speed )
		{
			this.x-=this.speed;
			if(this.anime>-8)this.anime--;
		}
		else if( key[39] && this.x<=(FIELD_W<<8)-this.speed )
		{
			this.x+=this.speed;
			if(this.anime<8)this.anime++;
		}
		else
		{
			if(this.anime>0)this.anime--;
			if(this.anime<0)this.anime++;
		}
		
		if( key[38] && this.y>this.speed )this.y-=this.speed;
		
		if( key[40] && this.y<=(FIELD_H<<8)-this.speed )
			this.y+=this.speed;
	}
	
	//描画
	draw()
	{
		if( this.muteki && (this.count&1) )return;
		drawSprite(2 + (this.anime>>2),this.x,this.y);
		
		if( this.count&1 )return;
		drawSprite(9 + (this.anime>>2),this.x,this.y+(24<<8) );
	}
	
	
}



//弾クラス
class Tama extends CharaBase
{
	constructor( x, y, vx, vy )
	{
		super( 6,x,y,vx,vy );
		//this.w = 4;
		//this.h = 6;
		this.r = 4;
	}
	
	update()
	{
		super.update();
		
		for( let i=0; i<teki.length ;i++)
		{
			if( !teki[i].kill )
			{
				if( checkHit(
				
					this.x, this.y, this.r,
					teki[i].x, teki[i].y, teki[i].r
				
				) )
				{
					this.kill=true;
					
					if( (teki[i].hp-= 10)<=0 )
					{
						teki[i].kill=true;
						
						explosion(
							teki[i].x,teki[i].y,
							teki[i].vx>>3,teki[i].vy>>3 );
						score += teki[i].score;
					}
					else
					{
						expl.push( new Expl( 0,this.x,this.y,0,0 ) );
					}
					
					if( teki[i].mhp>=1000 )
					{
						bossHP  = teki[i].hp;
						bossMHP = teki[i].mhp;
					}
					
					break;
					
				}
			}
		}
	}
	
	draw()
	{
		super.draw();
	}

}




