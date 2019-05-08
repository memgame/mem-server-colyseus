/**
 * <p>Interface for skills that require a specific target to cast</p>
 */
export interface ITargetSkill
{
    /**
     * Casts the skill
     *
     * @param user   user of the skill
     * @param target target of the skill
     * @param ally   whether or not the target is an ally
     *
     * @return true if could cast, false otherwise
     */
    cast(entity: any,  traget: any, ally: boolean): boolean
}