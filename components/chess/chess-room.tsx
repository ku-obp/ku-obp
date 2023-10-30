import type {
  MessageDecoder,
  MessageEncoder,
  WidgetState,
} from "@livekit/components-core";
import { isEqualTrackRef, isWeb, log } from "@livekit/components-core";
import {
  ConnectionCheck,
  DataPacket_Kind,
  Room,
  RoomEvent,
  Track,
} from "livekit-client";
import { useEffect, useState } from "react";
import type { MessageFormatter } from "@livekit/components-react";

import {
  CarouselLayout,
  ConnectionStateToast,
  FocusLayoutContainer,
  LayoutContextProvider,
  ParticipantTile,
  RoomAudioRenderer,
  useCreateLayoutContext,
  usePinnedTracks,
  useTracks,
  Chat,
  ControlBar,
  useDataChannel,
  DisconnectButton,
  ConnectionState,
  useConnectionState,
} from "@livekit/components-react";
import { ChessGame } from "./chess-game";
import { useRouter } from "next/navigation";

export interface VideoConferenceProps
  extends React.HTMLAttributes<HTMLDivElement> {
  chatMessageFormatter?: MessageFormatter;
  chatMessageEncoder?: MessageEncoder;
  chatMessageDecoder?: MessageDecoder;
  room?: any;
}

export const ChessRoom = ({
  chatMessageFormatter,
  chatMessageDecoder,
  chatMessageEncoder,
  room,
  ...props
}: VideoConferenceProps) => {
  const [widgetState, setWidgetState] = useState<WidgetState>({
    showChat: false,
    unreadMessages: 0,
  });

  const router = useRouter();
  const { message, send } = useDataChannel("update");
  const updatePlease = () => {
    const encoder = new TextEncoder();
    const data = encoder.encode("updatePlease" + Math.random().toString());
    send(data, { kind: DataPacket_Kind.RELIABLE });
  };
  let receivedData = new TextDecoder().decode(message?.payload);

  const tracks = useTracks(
    [{ source: Track.Source.Camera, withPlaceholder: true }],
    { updateOnlyOn: [RoomEvent.ActiveSpeakersChanged], onlySubscribed: false }
  );

  const widgetUpdate = (state: WidgetState) => {
    log.debug("updating widget state", state);
    setWidgetState(state);
  };

  const layoutContext = useCreateLayoutContext();

  const focusTrack = usePinnedTracks(layoutContext)?.[0];
  const carouselTracks = tracks.filter(
    (track) => !isEqualTrackRef(track, focusTrack)
  );

  // disconnected => /chess 라우팅
  const connectionState = useConnectionState();
  const [initialConnected, setInitialConnected] = useState(false);
  useEffect(() => {
    if (connectionState === "connected") {
      setInitialConnected(true);
    }
  }, [connectionState]);

  useEffect(() => {
    if (!initialConnected) {
      return;
    }
    if (connectionState === "disconnected") {
      router.push(`/chess`);
      console.log(connectionState);
    }
  }, [connectionState, initialConnected, router]);

  return (
    <div className="lk-video-conference" {...props}>
      {isWeb() && (
        <LayoutContextProvider
          value={layoutContext}
          // onPinChange={handleFocusStateChange}
          onWidgetChange={widgetUpdate}
        >
          <div className="lk-video-conference-inner">
            <div className="lk-focus-layout-wrapper">
              <FocusLayoutContainer>
                <CarouselLayout tracks={carouselTracks}>
                  <ParticipantTile />
                </CarouselLayout>
                <ChessGame
                  updatePlease={updatePlease}
                  receivedData={receivedData}
                />
              </FocusLayoutContainer>
            </div>
            <ControlBar controls={{ chat: true, screenShare: false }} />
          </div>
          <Chat
            style={{ display: widgetState.showChat ? "flex" : "none" }}
            messageFormatter={chatMessageFormatter}
            messageEncoder={chatMessageEncoder}
            messageDecoder={chatMessageDecoder}
          />
        </LayoutContextProvider>
      )}
      <RoomAudioRenderer />
      <ConnectionStateToast />
    </div>
  );
};
