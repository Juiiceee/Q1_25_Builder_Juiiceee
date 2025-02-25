use anchor_lang::prelude::*;

#[account]
pub struct Musician {
    name: String,
    style: Style,
    music_amount: u32
}