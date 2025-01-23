use anchor_lang::prelude::*;

use crate::instructions::*;
declare_id!("9iNpNYTx9TWoC9YZmUiJU73DYGq1Lga3Kp4BQm7dynG9");

pub mod instructions;
pub mod state;

#[program]
pub mod escrow {
    use super::*;
    pub fn make(ctx: Context<Make>, seed: u64, receive_amount: u64, deposit: u64) -> Result<()> {
        ctx.accounts.init_escrow(seed, receive_amount, &ctx.bumps)?;
        ctx.accounts.deposit(deposit)?;
        Ok(())
    }
    pub fn take(ctx: Context<Take>) -> Result<()> {
        ctx.accounts.deposit()?;
        ctx.accounts.withdraw_and_close_vault()?;
        Ok(())
    }
}
