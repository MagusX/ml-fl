cd core
# ./darknet detector test cfg/coco.data yolov3.cfg yolov3.weights -out ../public/response/predictions
./darknet detector test cfg/obj.data yolo-custom.cfg yolo-custom3400.weights -out ../public/response/predictions
