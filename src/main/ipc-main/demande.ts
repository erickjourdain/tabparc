import { ipcMain } from 'electron'
import { EnteteDemande } from '@apptypes/*'
import { Besoin } from '../database/entity/besoin.entity'
import { Demande } from '../database/entity/demande.entity'
import { Opportunite } from '../database/entity/opportunite.entity'
import { EnteteDemande as EnteteEntity } from '../database/entity/enteteDemande.entity'
import AppDataSource from '../database/data-source'
import opportuniteController from '../database/controller/opportunite'

// Création d'une demande liée à une opportunité
ipcMain.handle('demande.create', async (_event, args: [number, EnteteDemande]) => {
  // Creation de la transaction
  const queryRunner = AppDataSource.createQueryRunner()
  await queryRunner.startTransaction()
  try {
    // Sauvegarde de l'entete de la demande
    const newEntete = await queryRunner.manager.save(EnteteEntity, args[1])
    // Récupération de l'entité liée
    const opportunite = await opportuniteController.findById(args[0], [])
    // Création du lien entre l'opportunité et l'entête
    opportunite.demande = newEntete
    await queryRunner.manager.save(Opportunite, opportunite)
    // Enregistrement des lignes de la demande client et création d'un besoin par ligne
    for (let i = 0; i < args[1].demandes.length; i++) {
      await queryRunner.manager.save(Demande, { ...args[1].demandes[i], entete: newEntete })
      await queryRunner.manager.save(Besoin, { ...args[1].demandes[i], opportunite })
    }
    // Commit de la transaction
    await queryRunner.commitTransaction()
    await queryRunner.release()
    // Retour de l'opportunité avec la demande liéé
    return opportuniteController.findById(args[0], ['demande'])
  } catch (error) {
    // Rollback de la transaction
    await queryRunner.rollbackTransaction()
    await queryRunner.release()
    // Retour de l'erreur
    return new Promise((_, reject) =>
      reject({
        error,
        handle_as_rejected_promise: true
      })
    )
  }
})
