import { approvedServiceRecordSchema } from "../src/data/approved-service-schema";
import { approvedServices } from "../src/data/approved-services";
import { mediaRightsRegistry } from "../src/data/media-rights";
import { yachtRecordSchema } from "../src/data/yacht-schema";
import { publishableYachts } from "../src/data/yachts";

export const validateProductionData = () => {
  publishableYachts.forEach((record) => yachtRecordSchema.parse(record));
  approvedServices.forEach((record) => approvedServiceRecordSchema.parse(record));

  approvedServices.forEach((service) => {
    if (!service.media) return;
    const rights = mediaRightsRegistry.find((record) => record.id === service.media?.rightsRecordId);
    if (
      !rights ||
      rights.productionPath !== service.media.path ||
      !rights.approvedSurfaces.includes(`Service detail primary image: ${service.path}`) ||
      rights.socialPreviewApproved
    ) {
      throw new Error(`${service.path}: primary media lacks the exact approved service-detail rights scope.`);
    }
  });
};
