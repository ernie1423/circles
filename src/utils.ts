const { sqrt, atan2 } = Math;

/**
 * Предоставляет наиболее лёгкое управление координатами и т.д.
 */
class Vector {
    x: number;
    y: number;

    constructor(x?: number, y?: number){
        this.x = x || 0;
        this.y = y || 0;
    }

    /**
     * Установить значения x и y этому вектору. 
     */
    set(x: number, y: number){
        this.x = x;
        this.y = y;
    }

    /**
     * Прибавить соответственные координаты указанного вектора к этому.
     * 
     * @param aVector Вектор, от которого надо брать координаты
     */
    add(aVector: Vector){
        this.x += aVector.x;
        this.y += aVector.y;
    }

    /**
     * Получить вектор с соответственно сложенными координатами этого и другого вектора.
     * 
     * @param aVector Другой вектор, от которого надо брать координаты
     */
    summary(aVector: Vector): Vector {
        const { x: x1, y: y1 } = this;
        const { x: x2, y: y2 } = aVector;

        return new Vector(x1 + x2, y1 + y2);
    }

    /**
     * Создать новый вектор с этими же координатами.
     */
    clone(): Vector {
        return new Vector(this.x, this.y);
    }

    /**
     * Получить расстояние от конца текущего вектора к концу указанного.
     * 
     * @param aVector Координаты второго вектора
     */
    distance(aVector: Vector): number {
        const { x: x1, y: y1 } = this;
        const { x: x2, y: y2 } = aVector;

        return sqrt((x1 - x2)**2 + (y1 - y2)**2);
    }

    /**
     * Получить угол от конца этого вектора к концу другого.
     * 
     * @param aVector 
     */
    angleTo(aVector: Vector): number {
        const { x: x1, y: y1 } = this;
        const { x: x2, y: y2 } = aVector;

        return atan2(y2 - y1, x2 - x1);
    }
}

/**
 * Возвращает максимальное значение, если текущее его превышает. Возвращает минимальное значение, если превышает текущее. Если не случилось ни того, ни другого, возвращает текущее. Минимальное значение не должно превышать максимальное.
 * 
 * @param current Текущее значение
 * @param min Минимальное значение
 * @param max Максимальное значение
 */
function clamp(current: number, {min = -Infinity, max = Infinity}: {min?: number, max?: number}): number {
    if(min > max)
        throw new Error('Значение "min" не может быть больше значения "max".');
    
    if(current < min)
        return min;
    
    if(current > max)
        return max;

    return current;
}

/**
 * как ForEach, но позволяет применять несколько колбеков по отдельности
 */
function multiForEach<T = any>(array: Array<T>, ...callback: ((value: T, index: number) => void)[]): void {
    [...callback].forEach((v) => {
        array.forEach(v);
    })
}

export {
    Vector,
    clamp,
    multiForEach
}