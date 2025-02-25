use anchor_lang::prelude::*;

use crate::states::Style; // Import the Style enum

pub mod states;
pub mod instructions;

declare_id!("9tERi2qiameCyampKo4a9wTohJmnfDJm6x8aApcsr8sF");

#[program]
mod hello_anchor {
    use super::*;
    pub fn initialize_musician(ctx: Context<InitializeMusician>, name: String, style: Style) -> Result<()> {
        
    }
}
