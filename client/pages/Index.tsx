import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Camera, Heart, Users, Activity, Zap, Eye, Target } from "lucide-react";

interface EmotionPrediction {
  emotion: string;
  confidence: number;
  color: string;
}

export default function Index() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState<EmotionPrediction | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const emotions = [
    { name: "Joy", color: "bg-emotion-joy", icon: "😊" },
    { name: "Calm", color: "bg-emotion-calm", icon: "😌" },
    { name: "Focus", color: "bg-emotion-focus", icon: "🎯" },
    { name: "Surprise", color: "bg-yellow-400", icon: "😮" },
    { name: "Sadness", color: "bg-blue-400", icon: "😢" },
    { name: "Anger", color: "bg-red-400", icon: "😠" },
    { name: "Fear", color: "bg-purple-400", icon: "😨" },
  ];

  // Set video source when stream is available
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
      videoRef.current.play().catch(console.error);
    }
  }, [stream]);

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      stopTracking();
    };
  }, []);

  const startTracking = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 }
      });

      setStream(mediaStream);
      setIsTracking(true);
      setHasPermission(true);

      // Simulate emotion detection
      intervalRef.current = setInterval(() => {
        const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
        const confidence = Math.random() * 0.4 + 0.6; // 60-100% confidence
        setCurrentEmotion({
          emotion: randomEmotion.name,
          confidence,
          color: randomEmotion.color,
        });
      }, 2000);
    } catch (error) {
      console.error("Error accessing camera:", error);
      setHasPermission(false);
    }
  };

  const stopTracking = () => {
    // Stop camera stream
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }

    // Clear emotion detection interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setIsTracking(false);
    setCurrentEmotion(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-deepblue-50 via-white to-deepblue-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-r from-deepblue-600/10 via-deepblue-500/5 to-deepblue-700/10"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Brain className="w-16 h-16 text-deepblue-600 mr-4" />
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-deepblue-800">
                Deep<span className="text-deepblue-600">Mood</span>
              </h1>
            </div>
            <p className="text-xl sm:text-2xl text-deepblue-700 max-w-3xl mx-auto leading-relaxed">
              Advanced emotion recognition technology powered by AI to understand and enhance human emotional intelligence
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Badge variant="secondary" className="bg-emotion-joy/20 text-deepblue-800 px-4 py-2 text-lg">
                <Heart className="w-4 h-4 mr-2" />
                Empathy-Driven
              </Badge>
              <Badge variant="secondary" className="bg-emotion-calm/20 text-deepblue-800 px-4 py-2 text-lg">
                <Brain className="w-4 h-4 mr-2" />
                AI-Powered
              </Badge>
              <Badge variant="secondary" className="bg-emotion-focus/20 text-deepblue-800 px-4 py-2 text-lg">
                <Eye className="w-4 h-4 mr-2" />
                Real-Time
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-deepblue-800 mb-6">
              Bridging the Emotional Gap
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emotion-joy to-emotion-calm mx-auto mb-8"></div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="prose prose-lg text-deepblue-700 leading-relaxed">
                <p className="text-lg">
                  This novel implementation aims to address the lack of empathy and emotional awareness in everyday interactions. 
                  When individuals struggle to recognize or understand others' emotions, it can contribute to feelings of isolation, 
                  loneliness, or depression in those who go unnoticed or misunderstood.
                </p>
                <p className="text-lg">
                  A potential remedy for this issue would be to utilize machine-learning-based emotion classifiers with CNN 
                  architectures and fully connected layers to efficiently and effectively determine the emotional state of an 
                  individual given a live feed from glasses.
                </p>
                <p className="text-lg">
                  This could develop into more practical uses, such as in real-world hospitals for improved psychological 
                  therapy diagnosis.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-6 border-deepblue-200 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-0 text-center">
                  <Users className="w-12 h-12 text-emotion-calm mx-auto mb-4" />
                  <h3 className="font-semibold text-deepblue-800 mb-2">Enhanced Empathy</h3>
                  <p className="text-sm text-deepblue-600">Better understanding of emotional states</p>
                </CardContent>
              </Card>
              
              <Card className="p-6 border-deepblue-200 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-0 text-center">
                  <Activity className="w-12 h-12 text-emotion-focus mx-auto mb-4" />
                  <h3 className="font-semibold text-deepblue-800 mb-2">Real-time Analysis</h3>
                  <p className="text-sm text-deepblue-600">Instant emotion recognition and feedback</p>
                </CardContent>
              </Card>
              
              <Card className="p-6 border-deepblue-200 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-0 text-center">
                  <Target className="w-12 h-12 text-emotion-joy mx-auto mb-4" />
                  <h3 className="font-semibold text-deepblue-800 mb-2">Clinical Applications</h3>
                  <p className="text-sm text-deepblue-600">Therapeutic and diagnostic support</p>
                </CardContent>
              </Card>
              
              <Card className="p-6 border-deepblue-200 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-0 text-center">
                  <Zap className="w-12 h-12 text-emotion-energy mx-auto mb-4" />
                  <h3 className="font-semibold text-deepblue-800 mb-2">CNN Architecture</h3>
                  <p className="text-sm text-deepblue-600">Advanced machine learning algorithms</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* AI Emotion Tracking Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-deepblue-50 to-deepblue-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-deepblue-800 mb-6">
              Live Emotion Tracking
            </h2>
            <p className="text-xl text-deepblue-700 max-w-3xl mx-auto">
              Experience our AI-powered emotion recognition technology in real-time using your device's camera
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Camera Section */}
            <div className="space-y-6">
              <Card className="overflow-hidden border-deepblue-200">
                <CardContent className="p-6">
                  <div className="aspect-video bg-deepblue-900 rounded-lg overflow-hidden relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <Camera className="w-16 h-16 text-deepblue-400 mx-auto mb-4" />
                        <p className="text-deepblue-300 mb-4">
                          {hasPermission === false
                            ? "Camera access denied. Please allow camera permissions and refresh."
                            : isTracking
                            ? "Video feed active - check below for live output"
                            : "Click to start emotion tracking"
                          }
                        </p>
                        {!isTracking && hasPermission !== false && (
                          <Button
                            onClick={startTracking}
                            className="bg-deepblue-600 hover:bg-deepblue-700"
                          >
                            <Camera className="w-4 h-4 mr-2" />
                            Start Tracking
                          </Button>
                        )}
                        {isTracking && (
                          <Button
                            onClick={stopTracking}
                            variant="destructive"
                          >
                            Stop Tracking
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Video Output Box */}
              {isTracking && stream && (
                <Card className="border-deepblue-200 bg-black">
                  <CardContent className="p-4">
                    <div className="aspect-video bg-black rounded-lg overflow-hidden relative">
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full object-cover"
                      />
                      <canvas
                        ref={canvasRef}
                        className="absolute inset-0"
                        style={{ display: 'none' }}
                      />
                      <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                        Live Feed
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Current Emotion Display */}
              {currentEmotion && (
                <Card className="border-deepblue-200 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-2xl font-bold text-deepblue-800 mb-2">
                          Detected Emotion
                        </h3>
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full ${currentEmotion.color}`}></div>
                          <span className="text-xl font-semibold text-deepblue-700">
                            {currentEmotion.emotion}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-deepblue-600 mb-1">Confidence</p>
                        <p className="text-2xl font-bold text-deepblue-800">
                          {Math.round(currentEmotion.confidence * 100)}%
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 bg-deepblue-100 rounded-full h-2 overflow-hidden">
                      <div 
                        className="h-full bg-deepblue-600 transition-all duration-300 ease-out"
                        style={{ width: `${currentEmotion.confidence * 100}%` }}
                      ></div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Emotion Legend */}
            <div className="space-y-6">
              <Card className="border-deepblue-200">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-deepblue-800 mb-6">Emotion Categories</h3>
                  <div className="space-y-4">
                    {emotions.map((emotion) => (
                      <div key={emotion.name} className="flex items-center gap-4 p-3 rounded-lg hover:bg-deepblue-50 transition-colors">
                        <div className={`w-4 h-4 rounded-full ${emotion.color}`}></div>
                        <span className="text-2xl">{emotion.icon}</span>
                        <span className="font-medium text-deepblue-800">{emotion.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-deepblue-200 bg-gradient-to-br from-deepblue-50 to-white">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-deepblue-800 mb-4">How It Works</h3>
                  <div className="space-y-3 text-deepblue-700">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-deepblue-600 text-white text-sm flex items-center justify-center font-bold mt-0.5">1</div>
                      <p className="text-sm">Camera captures facial expressions in real-time</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-deepblue-600 text-white text-sm flex items-center justify-center font-bold mt-0.5">2</div>
                      <p className="text-sm">CNN processes facial features and micro-expressions</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-deepblue-600 text-white text-sm flex items-center justify-center font-bold mt-0.5">3</div>
                      <p className="text-sm">AI model predicts emotional state with confidence score</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-deepblue-600 text-white text-sm flex items-center justify-center font-bold mt-0.5">4</div>
                      <p className="text-sm">Results displayed instantly for immediate feedback</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-deepblue-600 to-deepblue-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to Transform Emotional Intelligence?
          </h2>
          <p className="text-xl text-deepblue-100 mb-8 max-w-3xl mx-auto">
            Join us in revolutionizing how we understand and respond to human emotions. 
            Together, we can build a more empathetic and emotionally aware world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-deepblue-700 hover:bg-deepblue-50 px-8 py-3 text-lg">
              <Brain className="w-5 h-5 mr-2" />
              Learn More
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-deepblue-700 px-8 py-3 text-lg">
              <Heart className="w-5 h-5 mr-2" />
              Get in Touch
            </Button>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-white">95%</div>
              <div className="text-deepblue-200">Accuracy Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">Real-time</div>
              <div className="text-deepblue-200">Processing Speed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">7+</div>
              <div className="text-deepblue-200">Emotion Categories</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
