import {AppDataSource} from '../ormconfig';
import {Jobs} from '../entities/Jobs';

const jobRepository = AppDataSource.getMongoRepository(Jobs);

async function createJob(
  chemicalsAmount: number,
  incoming: boolean,
  warehouseNumber: number,
) {


    const newJobs = jobRepository.create({
      chemicalsAmount: chemicalsAmount,
      incoming: incoming,
      warehouseNumber: warehouseNumber,
    
    });

    const jobs = await jobRepository.save(newJobs);
    console.log("Jobs has been saved:", newJobs); // eslint-disable-line no-console
    return jobs;
}


async function getAllJobs() {
  const jobs = await jobRepository.find();
  console.log("Found jobs:", jobs); // eslint-disable-line no-console
  return jobs;
}


export {createJob, getAllJobs, jobRepository};
