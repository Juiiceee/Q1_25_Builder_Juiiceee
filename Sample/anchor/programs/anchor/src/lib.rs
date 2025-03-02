use anchor_lang::prelude::*;

mod instructions;
mod states;

use instructions::*;
use states::*;

declare_id!("9tERi2qiameCyampKo4a9wTohJmnfDJm6x8aApcsr8sF");

#[program]
mod hello_anchor {
    use super::*;
    pub fn initialize_musician(
        ctx: Context<InitializeMusician>,
        name: String,
        style: Style,
    ) -> Result<()> {
        ctx.accounts.initialize_musician(name, style)
    }

    pub fn add_music(
        ctx: Context<AddMusic>,
        name: String,
        style: Style,
        price: u64,
        url_cover: String,
        url_song: String,
    ) -> Result<()> {
        ctx.accounts
            .add_music(name, style, price, url_cover, url_song)
    }
}
