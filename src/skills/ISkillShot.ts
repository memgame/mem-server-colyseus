/**
 * <p>Interface for skills that can be cast without a direct target</p>
 * <p>Common applications would include firing projectiles, self-targeting
 * skills, and AOE abilities around yourself or where you are looking</p>
 */
export interface ISkillShot
{
    /**
     * Casts the skill
     *
     * @param entity  user of the skill
     *
     * @return true if could cast, false otherwise
     */
    cast(entity: any): boolean
}