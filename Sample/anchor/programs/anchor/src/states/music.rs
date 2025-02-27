use crate::states::style::Style;
use anchor_lang::prelude::*;

#[account]
pub struct Music {
    pub name: String,
	pub artist: Pubkey,
    pub style: Style,
    pub price: u64,
    pub url_cover: String,
    pub url_song: String,
    pub supply_amount: u32,
}
