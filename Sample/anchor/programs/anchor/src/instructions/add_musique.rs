use anchor_lang::prelude::*;

use crate::states::{Music, Musician, Style};

#[derive(Accounts)]
#[instruction(name: String)]
pub struct AddMusic<'info> {
    #[account(init, payer = signer, seeds = [b"music", name.as_bytes(), musician.key().as_ref()], bump, space = 8 + 54 + 32 + 4 + 8 + 204 + 204 + 4)]
    pub music: Account<'info, Music>,
    #[account(mut)]
    pub signer: Signer<'info>,
    #[account(mut)]
    pub musician: Account<'info, Musician>,
    pub system_program: Program<'info, System>,
}

impl<'info> AddMusic<'info> {
    pub fn add_music(
        &mut self,
        name: String,
        artist: Pubkey,
        style: Style,
        price: u64,
        url_cover: String,
        url_song: String,
    ) -> Result<()> {
        let music = &mut self.music;
        let musician = &mut self.musician;
        music.name = name;
        music.artist = artist;
        music.style = style;
        music.price = price;
        music.url_cover = url_cover;
        music.url_song = url_song;
        musician.music_amount += 1;
        Ok(())
    }
}
