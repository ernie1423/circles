import { Ability, Input } from '../Ability';
import { Attribute } from '../Attribute';
import { Entity, EntityType } from '../Entity';
import { Circle } from '../EntityBody';
import { Vector } from '../utils';
import { ConstantMovement } from './ConstantMovement';
import { DieOnTouch } from './DieOnTouch';
import { HealthDecrease } from './HealthDecrease';
import { Spikes } from './Spikes';

class Blaster extends Ability {
    readonly name = 'blaster';

    charge: {
        current: number,
        max: number
    }

    attributes: {
        chargeRecovery: Attribute,
        projectileSpeed: Attribute,
        projectileLifespan: Attribute
    }

    constructor(entity: Entity){
        super(entity);

        this.charge = {
            current: 30,
            max: 30
        }

        this.attributes = {
            chargeRecovery: new Attribute(1),
            projectileSpeed: new Attribute(3),
            projectileLifespan: new Attribute(100)
        }
    }

    update(){
        if(this.charge.current < this.charge.max)
            this.charge.current++;
    }

    use(data: Input){
        if(this.charge.current !== this.charge.max) return;
        if(data.position == undefined) return;

        this.charge.current = 0;

        let { position, layer } = this.entity

        let angle: number = position.angleTo(
            new Vector(
                data.position.x,
                data.position.y
            )
        );

        let projectile = new Entity(position.x, position.y, layer);

        projectile.type = EntityType.Projectile
        projectile.team = this.entity.team;
        this.entity.team.members.push(projectile);

        projectile.health = {
            max: this.attributes.projectileLifespan.value,
            current: this.attributes.projectileLifespan.value
        }

        projectile.body = new Circle(projectile.position, 7);

        projectile.abilities.push(
            new ConstantMovement(projectile, this.attributes.projectileSpeed.value, angle),
            new DieOnTouch(projectile),
            new HealthDecrease(projectile, 1),
            new Spikes(projectile, 2)
        );

        layer.newEntities.push(
            projectile
        )
    }
}

export {
    Blaster
}