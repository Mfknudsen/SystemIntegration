import {AppDataSource} from '../ormconfig';
import {Warehouses} from '../entities/Warehouses';
import { ObjectId } from 'mongodb';

const warehouseRepository = AppDataSource.getMongoRepository(Warehouses);

async function getAllWarehouses() {
  const warehouses = await warehouseRepository.find();
  console.log("Found warehouses:", warehouses); // eslint-disable-line no-console
  return warehouses;
}

async function updateWarehouse(amountChanged: number, incoming: boolean, warehouseNumber: number ) {
  
  const warehouse = await warehouseRepository.findOne({where: {warehouseNumber: warehouseNumber}});
  console.log("Found warehouses:", warehouse); // eslint-disable-line no-console
    if (!warehouse) {
      throw new Error('Warehouse not found');
  } else {
console.log("------------------------------");
console.log(warehouse.currentStorage, warehouse.maximumStorage);
console.log("------------------------------");

    if(incoming && warehouse.currentStorage + amountChanged > warehouse.maximumStorage) {
      throw new Error('Warehouse capacity exceeded');
    }
    
    if(!incoming && (amountChanged > warehouse.currentStorage)) {
      throw new Error('Warehouse content not sufficient');
    } else {
      
      
      if(incoming) { 
        warehouse.currentStorage = warehouse.currentStorage + amountChanged;

} else {
        warehouse.currentStorage = warehouse.currentStorage - amountChanged;
      } 

        await warehouseRepository.save(warehouse);
        console.log("warehouse has been updated:", warehouse);
        return warehouse;
      }
        
  }
}

export {getAllWarehouses, updateWarehouse, warehouseRepository};
