import * as e2eRepository from "../repositories/e2eRepositorie";

export async function resetDatabase() {
  await e2eRepository.resetDatabase();
}
