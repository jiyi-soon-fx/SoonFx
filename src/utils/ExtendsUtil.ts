// export class ExtendsUtil {
//   /**
//    * 分割曲线
//    *
//    * @param 总数
//    * @param 切割数
//    * @param 指数
//    * @param 取整类型
//    * @param 低指数
//    * @param 高指数
//    * @returns {number[]}
//    */
//   static partitionCurve(
//     totalConsumption: number,
//     segmentCount: number,
//     exponent: number,
//     type?: number,
//     vlowerLimitRatio: number = 0.382,
//     vupperLimitRatio: number = 0.618
//   ): number[] {
//     let ratioData: number[] = [];
//     let outputData: number[] = [];
//     let lowerLimitRatio = vlowerLimitRatio;
//     let upperLimitRatio = vupperLimitRatio;
//     if (lowerLimitRatio == null) {
//       lowerLimitRatio = 0.382;
//     }
//     if (upperLimitRatio == null) {
//       upperLimitRatio = 0.618;
//     }
//     let cumulativeConsumption = 0;
//     for (let i = 1; i <= segmentCount; i++) {
//       let maxLevel = Math.pow(segmentCount, exponent);
//       let currentLevel = Math.pow(i, exponent);
//       let incrementalRatio = currentLevel / maxLevel;
//       let consumptionValue =
//         (i * (10000 * lowerLimitRatio)) / segmentCount +
//         incrementalRatio * (10000 * upperLimitRatio);
//       ratioData.push(consumptionValue);
//       cumulativeConsumption += consumptionValue;
//     }
//     for (let j = 0; j < ratioData.length; j++) {
//       if (type == null) {
//         outputData.push(
//           (ratioData[j] / cumulativeConsumption) * totalConsumption
//         );
//       } else {
//         switch (type) {
//           case 0:
//             outputData.push(
//               (ratioData[j] / cumulativeConsumption) * totalConsumption
//             );
//             break;
//           case 1:
//             outputData.push(
//               parseInt(
//                 ((ratioData[j] / cumulativeConsumption) *
//                   totalConsumption) as any
//               )
//             );
//             break;
//           case 2:
//             outputData.push(
//               Math.floor(
//                 (ratioData[j] / cumulativeConsumption) * totalConsumption
//               )
//             );
//             break;
//         }
//       }
//     }
//     return outputData;
//   }
// }
