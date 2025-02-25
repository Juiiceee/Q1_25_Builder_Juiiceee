use anchor_lang::prelude::*;

use crate::states::Musician;

#[derive(Accounts)]
pub struct InitializeMusician<'info> {
    #[account(init, payer = signer, seeds = [b"musician", signer.key().as_ref()], bump, space = 8 + 8)]
    pub musician: Account<'info, Musician>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

impl<'info> InitializeMusician<'info> {
    
}
