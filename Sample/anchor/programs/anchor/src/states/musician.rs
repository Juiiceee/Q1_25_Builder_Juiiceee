use crate::states::style::Style;
use anchor_lang::prelude::*;

#[account]
pub struct Musician {
    pub name: String,
    pub style: Style,
    pub music_amount: u32,
}
