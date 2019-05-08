/**
 * <p>Interface for skills that cannot be cast
 * but instead apply effects continuously such
 * as buffs or increased stats.</p>
 */
export interface IPassiveSkill
{
    /**
     * <p>Applies the skill effects when a player upgrades the skill
     * in their skill tree</p>
     * <p>The skill may or not be already unlocked so include the
     * proper checks if you are going to be removing previous
     * effects.</p>
     *
     * @param entity user to refresh the effect for
     */
    update(entity: any): void

        /**
     * <p>Applies effects when the API starts up or when
     * the player logs in. There will never be effects
     * already applied before this (unless you start it
     * prematurely) so you can just apply them without
     * checking to remove previous effects.</p>
     *
     * @param entity  user to initialize the effects for
     */
    initialize(entity: any): void

        /**
     * <p>Stops the effects when the player goes offline
     * or loses the skill</p>
     * <p>This could entail stopping tasks you use for
     * the skill, resetting health or other stats, or
     * other lasting effects you use.</p>
     *
     * @param entity  user to stop the effects for
     */
    stopEffects(entity: any): void
}