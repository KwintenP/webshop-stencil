import {Item} from '../entities/item.entity';
import {Observable} from 'rxjs/Observable';

export interface BasketService {
  readonly basket$: Observable<Array<Item>>;

  addItem(item, count);

  removeItem(item);
}
