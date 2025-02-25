use anchor_lang::prelude::*;

#[derive(AnchorDeserialize, AnchorSerialize, Debug, Clone)]
pub enum Style {
    Rock,
    Rap,
    Classique,
    Electro,
    Jazz,
}
