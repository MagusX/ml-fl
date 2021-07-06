cd core
# ./darknet detector test cfg/coco.data yolov3.cfg yolov3.weights -out ../public/response/predictions
./darknet detector test cfg/obj.data yolo-custom.cfg yolo-custom_best_9700_92.weights -out ../public/response/predictions
