use anchor_lang::prelude::*;

use crate::states::{Music, Musician, Style};

#[derive(Accounts)]
#[instruction(name: String, pubkey_artist: Pubkey)]
pub struct AddMusic<'info> {
    #[account(init, payer = signer, seeds = [b"music", name.as_bytes(), pubkey_artist.key().as_ref()], bump, space = 8 + 50 + 11 + 8 + 200 + 200 + 4)]
    pub music: Account<'info, Music>,
    #[account(mut)]
    pub signer: Signer<'info>,
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
        music.name = name;
        music.artist = artist;
        music.style = style;
        music.price = price;
        music.url_cover = url_cover;
        music.url_song = url_song;
        self.musician.music_amount += 1;
        Ok(())
    }
}
